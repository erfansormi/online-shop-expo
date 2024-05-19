import Text from "../ui/text";
import { Path, Svg } from "react-native-svg";
import { usePathname, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { BottomNavigationHeight } from "@/utils/constants/styles";
import { useCartStore } from "@/store/cart-store";

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <View
      style={{ height: BottomNavigationHeight }}
      className="absolute bottom-0 left-0 right-0 border-t-2 border-t-gray-200 bg-white"
    >
      <View className="flex-row pt-3">
        {tabs(pathname).map((item) => (
          <TouchableOpacity
            key={item.link}
            className="w-1/4"
            onPress={() => router.push(item.link)}
          >
            <View className="items-center justify-center">
              <View className="h-7">{item.icon}</View>
              <Text
                size="xs"
                className={`${pathname === item.link ? "text-rose-500" : "text-gray-500"}`}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomNavigation;

const CategoryIcon = () => {
  const pathname = usePathname();

  return (
    <Svg
      stroke={pathname === "/products" ? "rgb(244 63 94)" : "rgb(107, 114, 128)"}
      fill={pathname === "/products" ? "rgb(244 63 94)" : "rgb(107, 114, 128)"}
      strokeWidth={1}
      viewBox="0 0 24 24"
      fontSize={24}
      width={24}
      height={24}
    >
      <Path
        d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
        stroke="none"
      />
    </Svg>
  );
};

const CartIcon = () => {
  const cart = useCartStore();
  const pathname = usePathname();

  return (
    <View>
      <Ionicons
        name="cart-outline"
        size={26}
        color={pathname === "/cart" ? "rgb(244 63 94)" : "rgb(107, 114, 128)"}
      />

      {cart.products_counts ? (
        <View className="absolute bottom-0.5 -right-2 px-[5px] py-px bg-primary rounded-md">
          <Text style={{ fontSize: 10, lineHeight: 16 }} color="#fff">
            {cart.products_counts}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const tabs = (pathname: string) => [
  {
    link: "/",
    title: "خانه",
    icon: (
      <Ionicons
        name="home-outline"
        size={24}
        color={pathname === "/" ? "rgb(244 63 94)" : "rgb(107, 114, 128)"}
      />
    ),
  },
  {
    link: "/products",
    title: "محصولات",
    icon: <CategoryIcon />,
  },
  {
    link: "/cart",
    title: "سبد خرید",
    icon: <CartIcon />,
  },
  {
    link: "/profile/personal-info",
    title: "پروفایل",
    icon: (
      <FontAwesome5
        name="user"
        size={20}
        color={pathname === "/profile/personal-info" ? "rgb(244 63 94)" : "rgb(107, 114, 128)"}
      />
    ),
  },
];
