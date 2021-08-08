# 장바구니 기능 구현

[프로젝트 보러가기! 👍](https://pushapp-741a1.web.app)

## 사용언어는 ?

> React, TypeScript

## 사용 패키지 || 라이브러리는 ?

> Fakestore Api, material-ui, styled-components, redux-toolkit, react-query

## 👀 어떤 모습으로 개발이 되었나?

|                   | 구현된 이미지                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------ | --- |
| 인덱스            | ![](https://images.velog.io/images/hoon_dev/post/1c4478da-d5b4-4198-bdf1-1d962d547f93/image.png) |
| 비어있는 장바구니 | ![](https://images.velog.io/images/hoon_dev/post/f37fb910-f573-4765-a6bf-7d59f2fda0f0/image.png) |     |
| 장바구니 추가     | ![](https://images.velog.io/images/hoon_dev/post/bfd62775-874d-453a-b69d-719198abd32c/image.png) |

## 🕹 기능정보

---

### 1. FakeStore API 에서 상품 받아오기

- react query를 사용하여 data 담기

```ts
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

//react query 사용
const { data, isLoading, error } = useQuery("products", getProducts);
```

### 2. 장바구니에 담기

- 해당 상품이 장바구니에 안담겨있으면 새로운 객체 데이터로 담고, 담겨있다면 amount를 1추가하여 장바구니에 담겨있는 상품 갯수만 늘리기

```ts
const handleAddToCart = (clickedItem: CartItemType) => {
  setCartItems((prev) => {
    const isItemInCart = prev.find((item) => item.id === clickedItem.id);
    if (isItemInCart) {
      return prev.map((item) =>
        item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
      );
    }
    return [...prev, { ...clickedItem, amount: 1 }];
  });
};
```

### 3. 장바구니에서 상품 빼기

- 제거하려는 상품이 갯수가 1이라면 상태값을 빈배열로 아예 비워버리고, 2개 이상이라면 갯수 감소 시키기

```ts
const handleRemoveFromCart = (id: number) => {
  setCartItems((prev) =>
    prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack;
        return [...ack, { ...item, amount: item.amount - 1 }];
      } else {
        return [];
      }
    }, [] as CartItemType[])
  );
};
```

---

😎 감사합니다 :)
