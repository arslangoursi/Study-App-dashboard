const makeTree = (
  users: Array<{ placeInHierarchy: string } & Record<string, any>>
): any[] => {
  const tree: any[] = [];
  const nodeMap: Record<string, any> = {};

  users.forEach((user) => {
    const levels = user.placeInHierarchy.split("-");
    let currentLevel = tree;

    levels.forEach((_level, index) => {
      const currentPath = levels.slice(0, index + 1).join("-");
      let foundNode = nodeMap[currentPath];

      if (!foundNode) {
        foundNode = { placeInHierarchy: currentPath, children: [] };
        nodeMap[currentPath] = foundNode;
        currentLevel.push(foundNode);
        currentLevel.sort(
          (a, b) =>
            parseInt(a.placeInHierarchy.split("-")[index], 10) -
            parseInt(b.placeInHierarchy.split("-")[index], 10)
        );
      }

      if (index === levels.length - 1) {
        Object.assign(foundNode, { ...user, children: foundNode.children });
      }

      currentLevel = foundNode.children;
    });
  });

  return tree;
};

export default makeTree;
