import { typeDTO } from "./typeDTO";


type createInventoryDTO = {
  code: string;
  name: string;
  description: string;
  quantity: number;
  typeId: number;
};

type inventoryDTO = {
  code?: string;
  name: string;
  description: string;
  quantity: number;
  type?: typeDTO;
  typeId?: number;
};

export { inventoryDTO, createInventoryDTO };
