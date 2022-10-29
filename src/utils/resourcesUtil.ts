import goodStorage from "good-storage";

export class ResourcesUtil {
  static storeId = "resourcesMap";
  static pendingList: Array<Promise<any>> = [];
  static resourcesMap: Record<string, string> = {};
  static originDataByGlob: Record<string, any> = {};

  static isStoreEmpty() {
    const resourcesMapInStore = goodStorage.get(this.storeId);
    if (!resourcesMapInStore) return true;
    return Object.getOwnPropertyNames(resourcesMapInStore).length === 0;
  }

  static getFileName(absolutePath: string): string {
    return absolutePath.split("/").at(-1)!;
  }

  static buildResourcesMap(absolutePath: string) {
    this.resourcesMap[this.getFileName(absolutePath)] =
      this.originDataByGlob[absolutePath].default;
  }

  static loadAllResources() {
    if (this.isStoreEmpty()) {
      this.originDataByGlob = import.meta.glob("../assets/images/**/*.png", {
        eager: true,
      });
      Object.keys(this.originDataByGlob).forEach(
        this.buildResourcesMap.bind(this)
      );
      goodStorage.set(this.storeId, this.resourcesMap);
    } else {
      this.resourcesMap = goodStorage.get(this.storeId);
    }
  }

  static getSrc(resourcesName: string) {
    // 简单优化一下，默认 resources 指代 images 并且拼接 .png
    resourcesName = resourcesName.includes(".png")
      ? resourcesName
      : resourcesName.concat(".png");
    return this.resourcesMap[resourcesName] ?? "";
  }
}

export default ResourcesUtil.getSrc.bind(ResourcesUtil);
