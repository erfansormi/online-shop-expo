import React from "react";
import Text from "../ui/text";

const DiscountPercentage = ({
  discountPercentage,
}: {
  discountPercentage: number;
}) => {
  return (
    <Text className="rounded-full bg-primary px-2.5 py-0.5">
      <Text color="#fff" size="2xs" fontFamily="vazirBlack">
        {discountPercentage.toLocaleString("fa")}%
      </Text>
    </Text>
  );
};

export default DiscountPercentage;
