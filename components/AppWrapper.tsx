import React, { useEffect } from "react";
import { useAppDispatch } from "@/services/redux/hooks";
import { loadUser } from "@/services/redux/slices/userSlice";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AppWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default AppWrapper;
