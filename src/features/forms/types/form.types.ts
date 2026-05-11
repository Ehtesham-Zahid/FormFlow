type BlockType = "title" | "text" | "email" | "number" | "submit";

type Block = {
  id: string;
  type: BlockType;
  order: number;
  data: {
    label?: string; // for inputs
    value?: string; // for title
    placeholder?: string;
  };
};

type Form = {
  id: string;
  title: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
};
