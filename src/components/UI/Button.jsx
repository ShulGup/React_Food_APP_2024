export default function Button({ children, textOnly, className, ...props }) {
  let cssClassess = textOnly ? "ex-button" : "button";
  cssClassess += "" + className;

  return (
    <>
      <button {...props}>{children}</button>
      <span>Button</span>
      <button className={cssClassess} {...props}>
        {textOnly}
      </button>
    </>
  );
}
