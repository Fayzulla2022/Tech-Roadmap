import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePersistStore } from "../../store";
import UserService from "../../services/user";

function RoadMapCard({ data }) {
  const navigate = useNavigate();
  const { token, user, setUser } = usePersistStore((s) => s);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (data?.id) {
      let r = user?.favourites?.find((k) => k === data?.id);
      if (r) {
        setIsFavourite(true);
      }
    }
  }, [data?.id]);

  const handleAddFavourite = async () => {
    if (!token || !user) return;
    if (!data) return;
    await UserService.addFavourite(token, { id: data?.id }).then((result) => {
      if (result?.data) {
        setUser(result?.data);
        setIsFavourite(true);
      }
    });
  };

  const handleRemoveFavourite = async () => {
    if (!token || !user) return;
    if (!data) return;
    await UserService.removeFavourite(token, { id: data?.id }).then(
      (result) => {
        if (result?.data) {
          setUser(result?.data);
          setIsFavourite(false);
        }
      }
    );
  };

  return (
    <>
      <div className="cardHolder">
        <div className="d-flex align-item-center justify-content-between">
          <div>
            <p>{data?.description}</p>
            <h1>{data?.title}</h1>
          </div>
          <div className="favourite text-end" style={{ cursor: "pointer" }}>
            {isFavourite ? (
              <img
                src="/assets/imgs/favourite.svg"
                alt=""
                onClick={handleRemoveFavourite}
              />
            ) : (
              <img
                src="/assets/imgs/favourite-outline.svg"
                alt=""
                onClick={handleAddFavourite}
              />
            )}
          </div>
        </div>
        <div className="d-flex align-item-center justify-content-between flex-wrap gap-2">
          <div className="d-flex gap-1">
            {data?.tags?.map((k) => (
              <div className="hashTag" key={k}>
                #{k}
              </div>
            ))}
          </div>
          <div className="hashTag junior d-flex">
            <img
              src="/assets/imgs/junior.svg"
              className="me-1"
              width={13}
              alt=""
            />
            <span>{data?.level}</span>
          </div>
        </div>
        <img src={data?.imageUrl} className="w-100 my-3 cardImg" alt="" />
        <div className="d-flex align-item-center justify-content-between flex-wrap gap-2">
          <div className="progres">
            <img
              src="/assets/imgs/progress.svg"
              width={20}
              className="me-2"
              alt=""
            />
            <span>Progress</span>
          </div>
          <div className="d-flex gap-1">
            <div
              className="explore"
              onClick={() => navigate(`/details/${data?.id}`)}
            >
              Explore
            </div>
            <img
              src="/assets/imgs/gotolink.svg"
              width={40}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RoadMapCard;
