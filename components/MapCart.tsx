"use client";

import { cartAtom, cartStatusAtom } from "@/constants/state";
import { useCallback, useMemo } from "react";

import ClickAwayListener from "react-click-away-listener";
import Image from "next/image";
import axios from "axios";
import getCookieClient from "@/utils/getCookieClient";
import { toast } from "react-toastify";
import useAction from "@/hooks/useAction";
import { useAtom } from "jotai";
import useLanguage from "@/hooks/useLanguage";
import { useParams, useRouter } from "next/navigation";
import getUserClient from "@/utils/getUserClient";

export default function MapCart() {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useAtom(cartStatusAtom);
  const { projectNumber, mapNumber } = useParams();
  const [cart, setCart] = useAtom(cartAtom);
  const [lang] = useLanguage();

  const cartEntry = useMemo(
    () =>
      cart?.find(
        (item) =>
          item.projectNumber === projectNumber && item.mapNumber === mapNumber
      ),
    [cart, projectNumber, mapNumber]
  );

  const items = useMemo(() => cartEntry?.property || [], [cartEntry?.property]);

  const removeItem = useCallback(
    (id: string) => {
      setCart(
        cart.map((item) => ({
          ...item,
          property: item.property.filter((p) => p.id !== id)
        }))
      );
    },
    [cart, setCart]
  );
  const [isRegistering, handleRegister] = useAction({
    promise: async () => {
      if (!projectNumber || !mapNumber) {
        toast.error("Invalid project or map number");
        return Promise.reject();
      }

      if (!cart.length) {
        toast.error("Please add some properties to register");
        return Promise.reject();
      }

      const cartItem = cart.find(
        (item) =>
          item.projectNumber === projectNumber && item.mapNumber === mapNumber
      );

      if (!cartItem) {
        toast.error("Invalid project or map number");
        return Promise.reject();
      }

      const data = {
        projectNumber,
        mapNumber,
        property: items.map((item) => item.id),
        message: cartItem.message
      };

      const token = getCookieClient("token");

      if (!token) {
        toast.error("Please login to request");
        router.push(
          `/login?redirect=registration&projectNumber=${projectNumber}&mapNumber=${mapNumber}`
        );
        return Promise.reject();
      }

      const user = getUserClient();

      if (user.userType !== "customer") {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.error("Please login to request");
        router.push(
          `/login?redirect=registration&projectNumber=${projectNumber}&mapNumber=${mapNumber}`
        );
        return Promise.reject();
      }

      const { data: registerNewApplicationResponse } = await axios.post(
        "/api/registerNewApplication",
        { ...data, token }
      );

      const { invoice } = registerNewApplicationResponse;

      router.push(`/invoice?id=${invoice}`);

      return Promise.resolve({ data: {} });
    },
    onSuccess: () => {
      setCart(
        cart.filter(
          (item) =>
            item.projectNumber !== projectNumber || item.mapNumber !== mapNumber
        )
      );
      setCartOpen(false);
    },
    successMessage:
      lang === "ar" ? "تم تسجيل الطلب بنجاح" : "Request registered successfully"
  });

  return (
    <>
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="map__overlay__cart__button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </button>
      {cartOpen && (
        <ClickAwayListener onClickAway={() => setCartOpen(false)}>
          <div className="map__overlay__cart__modal">
            <div className="map__overlay__cart__modal__header">
              <div className="map__overlay__cart__modal__header__title">
                {lang === "ar" ? "عربة" : "Cart"} ({items?.length})
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="map__overlay__cart__modal__header__close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="map__overlay__cart__modal__body">
              {items?.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  {lang === "ar"
                    ? "سلة التسوق الخاصة بك فارغة"
                    : "Your cart is empty"}
                </div>
              ) : (
                items?.map((item) => (
                  <MapCartEntry
                    key={item.id}
                    data={item}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              )}
            </div>
            <div className="map__overlay__cart__modal__footer">
              <div className="map__overlay__cart__modal__footer__notes">
                <label htmlFor="notes">
                  {lang === "ar" ? "ملحوظات" : "Notes"}
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder={
                    lang === "ar"
                      ? "أدخل ملاحظاتك هنا"
                      : "Enter your notes here"
                  }
                  value={cartEntry?.message}
                  onChange={(e) =>
                    setCart(
                      cart.map((item) =>
                        item.projectNumber === projectNumber &&
                        item.mapNumber === mapNumber
                          ? { ...item, message: e.target.value }
                          : item
                      )
                    )
                  }
                />
              </div>
              {/* <div className="map__overlay__cart__total">
                <div className="map__overlay__cart__total__title">
                  {lang === "ar" ? "المجموع" : "Total"}
                </div>
                <div className="map__overlay__cart__total__price">
                  <CurrencyDisplay>
                    {items.reduce((acc, item) => acc + item.unitPrice, 0)}
                  </CurrencyDisplay>
                </div>
              </div> */}
              <button
                onClick={handleRegister}
                className="map__overlay__cart__modal__footer__button"
              >
                {isRegistering
                  ? lang === "ar"
                    ? "جار التسجيل..."
                    : "Registering..."
                  : lang === "ar"
                    ? "تقديم الطلب"
                    : "Apply For Quote"}
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}

function MapCartEntry({
  data,
  onRemove
}: {
  data: {
    id: string;
    entity: string;
    batch: string;
    area: string;
    unitPrice: number;
    images: string[];
  };
  onRemove: () => void;
}) {
  const [lang] = useLanguage();

  return (
    <div className="cart__model__property__warper">
      <button className="cart__model__delete" onClick={onRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
      <div className="cart__model__property__contact__image">
        <Image
          src={
            data.images.length > 0
              ? data.images[0] === ""
                ? "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
                : data.images[0]
              : "https://utfs.io/f/5WyNrWdR8eEcwYs7gDA7g2ILVBCmyPMxUE5bQicXwRNJToOZ"
          }
          width={200}
          height={200}
          alt={data.id}
        />
      </div>
      <div className="cart__model__property__contact__tile">
        <div className="cart__model__property__contact__tile__name">
          {data.entity}
        </div>
        <div className="cart__model__property__block">{data.batch}</div>
        {/* <div className="cart__model__property__contact__price">
          <CurrencyDisplay>{data.unitPrice}</CurrencyDisplay>
        </div> */}
        <div className="cart__model__property__area__warper">
          <div className="cart__model__property__area">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-scan"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            </svg>
            {data.area} {lang === "ar" ? "م²" : "m²"}
          </div>
        </div>
      </div>
    </div>
  );
}
