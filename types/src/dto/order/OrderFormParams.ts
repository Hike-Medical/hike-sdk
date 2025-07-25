import { RenderType } from '../manufacturing/RenderType';

export interface OrderFormCastingType {
  castingMethod: string;
  castingType: string;
}

export interface OrderFormSpecialtyStyles {
  specialty: string;
  coPoly: string;
}

export interface OrderFormBuildYourOwnFunctionalInsert {
  topCover: string;
  midLayer?: string;
  base: string;
}

export interface OrderFormBuildYourOwnDiabeticInsert {
  topCover?: string;
  triLam?: string;
  midLayer?: string;
  base: string;
}

export interface OrderFormProductType {
  productType: string;
  specialtyStyles?: OrderFormSpecialtyStyles;
  buildYourOwnFunctionalInsert?: OrderFormBuildYourOwnFunctionalInsert;
  buildYourOwnDiabeticInsert?: OrderFormBuildYourOwnDiabeticInsert;
}

export interface OrderFormShellSpecs {
  shellLength: string;
  topCoverLength: string;
}

export interface OrderFormMetSide {
  thickness: string;
  size: string;
}

export interface OrderFormMortonExtension {
  toTheToes: boolean;
}

export interface OrderFormAdditionsAndExtensions {
  offLoadMetHead?: number[];
  metPad?: OrderFormMetSide;
  metBar?: OrderFormMetSide;
  dancerPad?: boolean;
  toeCrest?: boolean;
  cuboidRaise?: boolean;
  mortonExtension?: OrderFormMortonExtension;
  reverseMortonExtension?: OrderFormMortonExtension;
}

export interface OrderFormPosting {
  type: string;
  angling: string;
}

export interface OrderFormArchHeight {
  height: string;
  modification: string;
}

export interface OrderFormFlangeHeight {
  type: string;
  modification: string;
}

export interface OrderFormAccomodations {
  foreFootPosting?: OrderFormPosting;
  rearFootPosting?: OrderFormPosting;
  archHeight?: OrderFormArchHeight;
  heelCupDepth?: string;
  flangeHeight?: OrderFormFlangeHeight;
  heelRaise?: string;
  firstRayCutout?: boolean;
  fifthRayCutout?: boolean;
}

export interface OrderFormFoot {
  accomodations?: OrderFormAccomodations;
  additionsAndExtensions?: OrderFormAdditionsAndExtensions;
}

export interface OrderFormParams {
  castingType: OrderFormCastingType;
  productType: OrderFormProductType;
  shellSpecs: OrderFormShellSpecs;
  leftFoot?: OrderFormFoot;
  rightFoot?: OrderFormFoot;
  scanType: RenderType;
  additionalNotes?: string;
}
