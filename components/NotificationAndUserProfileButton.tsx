import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import clsx from "clsx";
import { FontAwesome } from "@expo/vector-icons";

const NotificationAndUserProfileButton = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <View className="mr-4 flex-row items-center gap-4">
      <View className='bg-[#832CFF14] py-[7px] px-[9px] rounded-[7.58px]'>
          <FontAwesome name="bell-o" size={20} color="black" className='' />
          </View>

      <Link href="/">
        <TouchableOpacity
          className={clsx(
            "w-10 h-10 rounded-full items-center justify-center",
            user?.avatar && user.avatar.url ? "" : "bg-primary/10"
          )}
        >
          {user?.avatar && user.avatar.url ? (
            <Image
              src={user.avatar.url}
              alt={`${user.firstname}'s avatar`}
              resizeMode="cover"
              className="w-full h-full rounded-full"
            />
          ) : (
            <Text className="text-base text-primary leading-tight font-mada-semibold">
              {capitalizeFirstLetter(user?.firstname ? user?.firstname.charAt(0) : "U")}
              {user?.lastname
                ? capitalizeFirstLetter(user.lastname.charAt(0))
                : ""}
            </Text>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default NotificationAndUserProfileButton;
