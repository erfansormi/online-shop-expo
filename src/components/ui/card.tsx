import { View, Text, ViewProps } from "react-native";

const Card = ({ style, ...props }: ViewProps) => {
  return (
    <View className="rounded-lg border border-gray-200 p-4" style={[style]}>
      {props.children}
    </View>
  );
};

export default Card;
