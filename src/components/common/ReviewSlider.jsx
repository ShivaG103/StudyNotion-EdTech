import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../App.css";
// Icons
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

import { setLoading } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
      dispatch(setLoading(false));
    })();
  }, []);

  // console.log(reviews)

  return (
    <div className="text-white">
      {loading ? (
        <div className="grid min-h-[184px] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent ">
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1024: {
                slidesPerView: 4,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="lg:w-full h-[10rem] w-4/6"
          >
            {reviews.map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 h-[10rem] ">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                        <h2 className="text-[12px] font-medium text-richblack-500">
                          {review?.course?.courseName}
                        </h2>
                      </div>
                    </div>
                    <p className="font-medium text-richblack-25">
                      {review?.review.split(" ").length > truncateWords
                        ? `${review?.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                        : `${review?.review}`}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <h3 className="font-semibold text-yellow-100 mt-1">
                        {review.rating.toFixed(1)}
                      </h3>
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<IoIosStarOutline />}
                        fullIcon={<IoIosStar />}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
            {/* <SwiperSlide>Slide 1</SwiperSlide> */}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ReviewSlider;
