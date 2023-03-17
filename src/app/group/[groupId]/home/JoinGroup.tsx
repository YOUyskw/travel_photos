"use client";

import { useUser } from "@/provider/AuthStateProvider";
import { joinGroup } from "@/repo/group";
import React, { useEffect } from "react";

export type JoinGroupProps = {
  groupId: string;
};

const JoinGroup: React.FC<JoinGroupProps> = ({ groupId }) => {
  const user = useUser();
  useEffect(() => {
    if (user != null) {
      joinGroup(groupId, user?.uid);
    }
  }, [groupId, user]);
  return null;
};

export default JoinGroup;
