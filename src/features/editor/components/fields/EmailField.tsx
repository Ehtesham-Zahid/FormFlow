import { IField } from "@/src/types/form.types";

type Props = {
  field: IField;
  dispatch: React.Dispatch<any>;
};

export default function EmailField({ field, dispatch }: Props) {
  return (
    <div className="border p-3 rounded-md space-y-2 bg-white">
      {/* Label */}
      <input
        className="font-medium w-full outline-none"
        value={field.label}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            payload: {
              id: field.id,
              data: { label: e.target.value },
            },
          })
        }
      />

      {/* Preview input */}
      <input
        type="email"
        className="border p-2 w-full rounded"
        placeholder="example@email.com"
        disabled
      />

      <button
        className="text-sm text-red-500"
        onClick={() =>
          dispatch({
            type: "DELETE_FIELD",
            payload: {
              id: field.id,
            },
          })
        }
      >
        Delete
      </button>
    </div>
  );
}
