import { ChartUser } from "@/interfaces";
import { TreeNode } from "react-organizational-chart";
import UserNode from "./UserNode";

export default function Node({ data }: { data: ChartUser }) {
  return (
    <TreeNode label={<UserNode data={data} />}>
      {data.children?.map((child) => <Node key={child.id} data={child} />)}
    </TreeNode>
  );
}
