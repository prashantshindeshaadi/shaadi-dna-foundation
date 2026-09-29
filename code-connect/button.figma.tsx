// Template. Not active until the catalogue app exists.
//
// Replace:
//   - the import path with the real Button component
//   - FIGMA_NODE with the button component set URL from the Figma file
//
// Then: npx figma connect publish --token $FIGMA_TOKEN

import figma from "@figma/code-connect";
// import { Button } from "@shaadi/catalogue";

const FIGMA_NODE = "https://figma.com/file/l1SuD1Q1l8QXGvtomszGYW?node-id=163-1301";

figma.connect(/* Button */ null as never, FIGMA_NODE, {
  props: {
    // Map Figma component properties, never layer names.
    variant: figma.enum("Type", {
      Primary: "primary",
      Secondary: "secondary",
      Tertiary: "tertiary",
      Ghost: "ghost",
      "Premium Solid": "premium-solid",
      "Premium Soft": "premium-soft",
    }),
    size: figma.enum("Size", { Large: "lg", Medium: "md", Small: "sm" }),
    state: figma.enum("State", {
      Default: "default",
      Hover: "hover",
      Pressed: "pressed",
      Disabled: "disabled",
      Focus: "focus",
      Loading: "loading",
    }),
    label: figma.string("Label"),
    leadingIcon: figma.boolean("Leading icon"),
    trailingIcon: figma.boolean("Trailing icon"),
  },
  example: (props) => null,
  // example: (props) => (
  //   <Button variant={props.variant} size={props.size} disabled={props.state === "disabled"}>
  //     {props.label}
  //   </Button>
  // ),
});
