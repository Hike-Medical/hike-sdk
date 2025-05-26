export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow parameterized routes before static routes within the same HTTP method in NestJS controllers'
    },
    schema: []
  },

  create(context) {
    const HTTP_METHODS = ['Get', 'Post', 'Put', 'Patch', 'Delete'];

    // Checks if a class is a NestJS controller
    const isController = (node) =>
      node.decorators?.some((d) => d.expression.type === 'CallExpression' && d.expression.callee.name === 'Controller');

    // Extracts HTTP method and route string from a decorator
    const getRoute = (decorator) => {
      const expr = decorator.expression;

      if (expr.type !== 'CallExpression') {
        return null;
      }

      const method = expr.callee.name;
      const [arg] = expr.arguments;

      if (!HTTP_METHODS.includes(method)) {
        return null;
      }

      const route = arg?.type === 'Literal' && typeof arg.value === 'string' ? arg.value : '';

      return { method, route };
    };

    return {
      ClassDeclaration(node) {
        if (!isController(node)) {
          return;
        }

        const methodsByHttp = {};

        for (const method of node.body.body) {
          if (method.type !== 'MethodDefinition') {
            continue;
          }

          for (const decorator of method.decorators || []) {
            const routeInfo = getRoute(decorator);

            if (!routeInfo) {
              continue;
            }

            const { method: httpMethod, route } = routeInfo;

            methodsByHttp[httpMethod] ||= [];
            methodsByHttp[httpMethod].push({ route, decorator });
          }
        }

        for (const [method, entries] of Object.entries(methodsByHttp)) {
          let seenParamRoute = false;

          for (const { route, decorator } of entries) {
            const isParamRoute = /[:*]/.test(route); // support for :id or *wildcards

            if (isParamRoute) {
              seenParamRoute = true;
            } else if (seenParamRoute) {
              context.report({
                node: decorator,
                message:
                  'Static route "{{route}}" should be declared before parameterized routes for method {{method}}.',
                data: { route, method }
              });
            }
          }
        }
      }
    };
  }
};
