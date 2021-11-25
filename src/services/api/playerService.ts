import { PlayerModel } from "src/models/playerModel";
import initializeDbContainers from "src/utils/cosmosDbConnect";

const partitionNameKey = "/players";

export const playerFind = async (): Promise<PlayerModel[]> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resources } = await container.items
      .readAll<PlayerModel>()
      .fetchAll();

    return resources;
  } catch (e) {
    throw e;
  }
};

export const playerFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id).delete();
  } catch (e) {
    throw e;
  }
};

export const playerSave = async (body: PlayerModel): Promise<PlayerModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.items.create<PlayerModel>(body);
    if (!resource) {
      throw new Error("Player not saved");
    } else {
      return resource;
    }
  } catch (e) {
    throw e;
  }
};

export const playerFindByIdAndUpdate = async (
  id: string,
  body: PlayerModel
): Promise<void> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    await container.item(id).replace(body);
  } catch (e) {
    throw e;
  }
};

export const playerFindById = async (id: string): Promise<PlayerModel> => {
  try {
    const container = await initializeDbContainers(partitionNameKey);
    const { resource } = await container.item(id).read<PlayerModel>();
    if (!resource) {
      throw new Error("Player not found");
    } else {
      return resource;
    }
  } catch (e) {
    throw e;
  }
};
