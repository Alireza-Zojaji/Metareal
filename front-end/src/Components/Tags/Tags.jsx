const createComponent = (defaultClassName) => ({ className = "", children, ...props }) => (
  <div {...props} className={`${defaultClassName} ${className}`}>
    {children}
  </div>
);
export const Flex = createComponent("flex");
export const Fixed = createComponent("fixed");
export const Grid = createComponent("grid");
export const Hidden = createComponent("hidden");
export const Inside = createComponent("");
export const Body = createComponent("");
export const Title = createComponent("");
export const SubTitle = createComponent("");
export const Col = createComponent("");
export const Icon = createComponent("");
export const Describe = createComponent("");
export const Label = createComponent("");
export const Divider = createComponent("divider");
export const Relative = createComponent("relative");
export const Absolute = createComponent("absolute");
export const Container = createComponent("");
