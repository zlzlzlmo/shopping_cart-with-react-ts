import React from "react";
import Button from "@material-ui/core/Button";
//타입 임포트
import { CartItemType } from "../App";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <h3>{item.description}</h3>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>장바구니 추가</Button>
    </Wrapper>
  );
};

export default Item;
