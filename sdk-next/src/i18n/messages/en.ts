export default {
  shared: {
    languages: {
      English: 'English',
      Spanish: 'Español'
    },
    termsPrivacy: 'By continuing, you understand and agree to our <terms>Terms & Conditions</terms>',
    fields: {
      firstName: 'First name',
      firstNameError: 'First name is required',
      lastName: 'Last name',
      lastNameError: 'Last name is required',
      email: 'Email address',
      emailPlaceholder: 'Your email address',
      emailError: 'Email address is required',
      emailInvalid: 'Invalid email address',
      phone: 'Phone number',
      phonePlaceholder: 'Your phone number',
      phoneError: 'Phone number is required',
      phoneInvalid: 'Invalid phone number',
      emailPhoneError: 'You must provide either an email or a phone number',
      emailPhoneConflict: 'You must provide either an email or a phone number',
      emailOrPhone: 'Email or phone number',
      emailOrPhoneInvalid: 'Invalid email or phone number',
      requiredOptionError: 'Please choose an option',
      password: 'Password',
      passwordPlaceholder: 'Your password',
      passwordRequired: 'Password is required',
      newPassword: 'Create a password',
      newPasswordPlaceholder: 'Enter your new password',
      confirmPassword: 'Re-enter password',
      confirmPasswordPlaceholder: 'Confirm your new password',
      passwordMismatch: 'Passwords do not match'
    },
    action: {
      continue: 'Continue',
      loading: 'Loading',
      submit: 'Submit',
      next: 'Next',
      login: 'Login',
      register: 'Register',
      select: 'Select',
      back: 'Back',
      skip: 'Skip',
      cancel: 'Cancel',
      remove: 'Remove'
    },
    label: {
      price: 'Price',
      size: 'Size',
      info: 'Information',
      color: 'Color',
      width: 'Width',
      gender: 'Gender'
    },
    error: {
      title: 'Error',
      message: 'An error occurred for your request.',
      notLoading: 'An error occurred while loading your info.',
      detailsNotUpdated: 'Failed to update details. Please try again.',
      detailsConflict: 'The details you provided is already in use. Please try again.',
      invitationNotFound: 'Your details could not be found. Please check your invitation link.',
      tooManyRequests: 'Too many requests, please try again later.'
    },
    login: {
      page: {
        title: 'Welcome to {companyName}, login with',
        magicLink: 'Magic Link',
        orContinue: 'Or continue with credentials',
        forgotPassword: 'Forgot your password?',
        register: "Don't have an account? Register",
        actionButton: 'Login',
        error: {
          incorrectCredentials: 'Failed to login'
        }
      },
      accountRecovery: {
        title: 'Password Recovery',
        sentDescription: 'Instructions to reset your password have been sent.',
        sentGoToLogin: 'Would you like to go back to the login screen?',
        sentError: 'Failed account recovery. Please try again.',
        sentActionButton: 'Go to Login',
        actionButton: 'Recover Password'
      },
      magicLink: {
        title: 'Login',
        sentDescription: 'Your login link has been sent successfully.',
        sentGoToLogin: 'Please follow the instructions in the link to login.',
        sentLoading: 'Please wait while we log you in...',
        sentError: 'Failed to send login link. Please try again.',
        actionButton: 'Send Login Link'
      },
      resetPassword: {
        title: 'Set a password for your account',
        criteria: {
          description: 'Password must be at least 8 characters with at least 1 number and 1 special character (!%#)',
          length: 'Contains at least 8 characters',
          number: 'Contains at least one number',
          special: 'Contains at least one special character ( !@#$&% )'
        },
        successDescription: 'Your password has been reset successfully.',
        sentGoToLogin: 'Would you like to go back to the login screen?',
        sentError: 'Failed to reset password. Please try again.',
        tokenRequired: 'Token is required. Please check your email for the reset link.',
        sentActionButton: 'Go to Login',
        actionButton: 'Reset Password'
      },
      otp: {
        title: 'We sent you a code',
        description:
          'To verify your contact information, please enter the six digit code that was sent to you at: <strong>{contact}</strong>',
        invalidCode: 'The six digit code you entered is incorrect.',
        waitMessage: 'Wait {seconds} seconds before we can send the code again',
        resendButton: 'Resend code',
        error: {
          couldNotSend: 'Failed to send OTP. Please try again.',
          notAllowed: {
            title: 'Access Not Available',
            description:
              'We are unable to process your signup at this time. This contact information is not currently eligible for registration.',
            suggestion: 'If you believe this is an error, please contact support for assistance.',
            goBack: 'Go Back'
          }
        }
      },
      tokenRefresher: {
        title: 'Session expiring soon',
        message: 'You will be logged out in less than {minutes} minutes unless you become active.'
      },
      tokenInvalid: {
        title: 'The token is invalid or has expired.',
        description: 'Please request a new login link.',
        actionButton: 'Go to Login'
      }
    },
    companyDisabled: {
      title: 'Company Disabled',
      description:
        'This company has been disabled. If you think this is a mistake, contact our support line for further assistance.'
    }
  },
  components: {
    selectCompany: {
      label: 'Select a company',
      placeholder: 'Search for a company',
      noResults: 'No results found',
      minSearchLength: 'Type at least {length} characters'
    }
  },
  suppliers: {
    allCategories: 'All Categories',
    product: 'Product',
    noProductsFound: 'No products found',
    searchPlaceholder: 'Search products',
    addToOrder: 'Add to Order',
    featured: 'Featured',
    edit: 'Edit',
    remove: 'Remove',
    errorLoadingCatalogTitle: 'Error loading catalog',
    errorLoadingCatalogMessage: 'There was an error loading the catalog. Please try again later.',
    errorAddingProductTitle: 'Error adding product to order',
    errorAddingProductMessage: 'There was an error adding the product to the order. Please try again later.',
    noSuppliersAvailableTitle: 'No suppliers available',
    noSuppliersAvailableMessage: 'No supplier catalogs are available for this form. Please contact support.',
    orthofeet: {
      catalog: {
        searchPlaceholder: 'Search for a product',
        viewAllPrices: 'View All Prices',
        viewingUnder: 'Viewing Shoes Under {price}'
      },
      productCard: {
        addPair: 'Add Pair',
        bestSeller: 'BEST SELLER'
      },
      productDetail: {
        title: 'Select Footwear',
        shoeSizes: 'Shoe Sizes (US)',
        selectGender: 'Please select a gender first',
        selectColor: 'Please select a color first',
        selectWidth: 'Please select a width first',
        selectAllOptions: 'Select all options to view price',
        prefabInsert: 'Prefab Insert',
        prefabInsertDescription: 'Add a prefab insert to your order for an additional {price}',
        prefabQuantity: 'Quantity',
        prefabSelectQuantity: 'Please select a quantity',
        outOfStock: 'Out of Stock',
        outOfStockMessage: 'This item is currently out of stock. Please select a different option.',
        shoePrice: 'Shoe Price',
        insertPrice: 'Insert Price',
        totalPrice: 'Total Price',
        addToOrder: 'Add to Order',
        missingInfoTitle: 'Missing Information',
        missingInfoMessage: 'Please ensure you have selected all the required options.'
      },
      selectedProduct: {
        addedTitle: 'Product added to order',
        errorLoadingTitle: 'Error loading product',
        errorLoadingMessage: 'Could not load product details. Please try again.',
        notFoundTitle: 'Product not found',
        notFoundMessage: 'The selected product could not be found. Please select another product.',
        variantNotFoundTitle: 'Product variant not found',
        variantNotFoundMessage: 'Could not load details for this product variant. The SKU may be invalid.',
        shoePrice: 'Shoe Price',
        insertPrice: 'Insert Price',
        totalPrice: 'Total Price',
        prefabQuantityLabel: 'Prefab Insert Quantity',
        editPair: 'Edit Pair',
        removeConfirmTitle: 'Remove product from order',
        removeConfirmMessage: 'Are you sure you want to remove <b>{productName}</b> from the order?'
      },
      review: {
        notFoundTitle: 'Orthofeet product not found',
        notFoundMessage: 'The Orthofeet product with SKU <b>{sku}</b> was not found. Please contact support.'
      }
    },
    generic: {
      productCard: {
        variantCount: '{count} options',
        variantCountSingular: '{count} option'
      },
      productDetail: {
        selectVariant: 'Select Variant',
        selectVariantPlaceholder: 'Choose a variant...',
        selectVariantHint: 'Please select a variant to continue',
        variantSelected: 'Variant Selected',
        attributes: 'Attributes',
        noVariantsAvailable: 'No variants available for this product.',
        addToOrder: 'Add to Order',
        updateProduct: 'Update Product'
      },
      selectedProduct: {
        addedTitle: 'Product added to order',
        editProduct: 'Edit Product',
        removeConfirmTitle: 'Remove product from order',
        removeConfirmMessage: 'Are you sure you want to remove <b>{productName}</b> from the order?'
      }
    }
  }
} as const;
