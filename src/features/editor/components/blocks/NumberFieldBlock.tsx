import { Block } from "../../types/editor.types";

type Props = {
  block: Block;
  dispatch: any;
};

export default function NumberFieldBlock({ block, dispatch }: Props) {
  return (
    <div className="border p-3 rounded-md space-y-2 bg-white">
      <input
        className="font-medium w-full outline-none"
        value={block.props.label}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_BLOCK",
            payload: {
              id: block.id,
              props: { label: e.target.value },
            },
          })
        }
      />

      <input
        type="number"
        className="border p-2 w-full rounded"
        placeholder={block.props.placeholder}
        disabled
      />
    </div>
  );
}
