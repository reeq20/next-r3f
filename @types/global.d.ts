/* eslint-disable  */
declare module "*.css" {
  type ClassNames = {
    [className: string]: string;
  };
  const className: ClassNames;
  export = className;
}

declare module "*.scss";

declare module "*.glsl" {
  const src: string;
  export default src;
}

declare module "*.vs.glsl" {
  const src: string;
  export default src;
}

declare module "*.fs.glsl" {
  const src: string;
  export default src;
}
