"use client";

import { ReactNode, use, useMemo } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import Node from "@/components/Node";
import { Tree } from "react-organizational-chart";
import makeTree from "@/utils/makeTree";

export default function UsersTree({
  users,
  noUsers
}: {
  users: any;
  noUsers: ReactNode;
}) {
  const tree = useMemo(() => makeTree(users), [users]);

  return users.length === 0 ? (
    noUsers
  ) : (
    <TransformWrapper centerOnInit={true} doubleClick={{ disabled: true }}>
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", padding: 20 }}
      >
        <Tree
          label={
            <div
              style={{
                backgroundColor: "var(--white)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                margin: "0 auto",
                marginBottom: -50,
                position: "relative",
                zIndex: 1
              }}
            />
          }
          lineHeight="50px"
          lineBorderRadius="5px"
          lineColor="var(--grey)"
          lineWidth="5px"
          nodePadding="0px"
        >
          {tree.map((user: any) => (
            <Node key={user.id} data={user} />
          ))}
        </Tree>
      </TransformComponent>
    </TransformWrapper>
  );
}
