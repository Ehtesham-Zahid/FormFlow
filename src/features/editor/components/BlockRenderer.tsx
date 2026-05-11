import { Block } from "../types/editor.types";
import TextFieldBlock from "./blocks/TextFieldBlock";
import EmailFieldBlock from "./blocks/EmailFieldBlock";
import NumberFieldBlock from "./blocks/NumberFieldBlock";

type Props = {
  block: Block;
  dispatch: any;
};

export default function BlockRenderer({ block, dispatch }: Props) {
  switch (block.type) {
    case "text":
      return <TextFieldBlock block={block} dispatch={dispatch} />;

    case "email":
      return <EmailFieldBlock block={block} dispatch={dispatch} />;

    case "number":
      return <NumberFieldBlock block={block} dispatch={dispatch} />;

    default:
      return null;
  }
}
