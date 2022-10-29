export class ResourcesUtil {
  static pendingList: Array<Promise<any>> = [];
  static resourcesMap: Record<string, string> = {};

  static getFileName(absolutePath: string): string {
    return absolutePath.split("/").at(-1)!;
  }

  static buildResourcesMap({ default: absolutePath }: any) {
    this.resourcesMap[this.getFileName(absolutePath)] = absolutePath;
  }

  static loadAllResources() {
    const loadingStack = [];
    loadingStack.push(import.meta.glob("../assets/images/**/*.png"));
    loadingStack.forEach(this.loading.bind(this));
  }

  static loading(originDataByGlob: Record<string, FuncType>) {
    Object.keys(originDataByGlob).forEach((relativePath) => {
      this.pendingList.push(originDataByGlob[relativePath]());
    });
    Promise.all(this.pendingList).then((list) => {
      list.forEach(this.buildResourcesMap.bind(this));
      // console.log(this.resourcesMap);
    });
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
