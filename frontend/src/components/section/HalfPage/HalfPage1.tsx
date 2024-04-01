import { useEffect, useRef, useState } from 'react';
import { Title, Event, Product } from '../../../type/types';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import { loadEventImg } from '../../../util/loadEventImg';

interface Prop {
    turn: number;
    titleList: Title[];
    eventList: Event[];
    productList: Product[];
    webSocketId: string;
    webSocketClient: Client;
    halfIncome: number;
    halfOutcome: number;
    setMode: React.Dispatch<React.SetStateAction<number>>;
    inProductList: number[];
}

//반기 보고서 1페이지(분기 보고서)
export default function HalfPage1(props: Prop) {
    const [timeDuration1, setTimeDuration1] = useState<string>('');
    const [timeDuration2, setTimeDuration2] = useState<string>('');
    const [nowSeason, setNowSeason] = useState<string>('');

    const [eventDescription, setEventDescription] = useState<string>('');
    const [cropName, setCropName] = useState<string>('');
    const [cropSeason, setCropSeason] = useState<string>('');

    const [seasonEventList, setSeasonEventList] = useState<Event[]>([]);

    const eventDescRef = useRef<HTMLDivElement>(null);
    const cropDescRef = useRef<HTMLDivElement>(null);

    /**이벤트 이미지 호버링하면 출력 */
    const hoverEventImg = (event: Event) => {
        setEventDescription(event.eventContent);
        if (eventDescRef.current) {
            eventDescRef.current.style.opacity = '100';
            eventDescRef.current.style.transition = 'linear 0.5s';
            eventDescRef.current.style.zIndex = '30';
        }
    };

    /**이벤트 이미지 호버링 끝나면 출력 */
    const endHoverEvent = () => {
        if (eventDescRef.current) {
            eventDescRef.current.style.opacity = '0';
            eventDescRef.current.style.transition = 'linear 0.5s';
            eventDescRef.current.style.zIndex = '-20';
        }
    };

    /**작물 이미지 호버링 시 출력 */
    const hoverCropImg = (cropId: number) => {
        const crop: Product = props.productList[cropId];
        setCropName(crop.productName);
        switch (crop.productType) {
            case 'SPRING':
                setCropSeason('봄');
                break;
            case 'SUMMER':
                setCropSeason('여름');
                break;
            case 'FALL':
                setCropSeason('가을');
                break;
            case 'WINTER':
                setCropSeason('겨울');
                break;
            case 'ALL':
                setCropSeason('연중 내내');
                break;
        }
        if (cropDescRef.current) {
            cropDescRef.current.style.opacity = '100';
            cropDescRef.current.style.transition = 'linear 0.5s';
            cropDescRef.current.style.zIndex = '30';
        }
    };

    /**작물 이미지 호버링 끝나면 출력 */
    const endHoverCrop = () => {
        if (cropDescRef.current) {
            cropDescRef.current.style.opacity = '0';
            cropDescRef.current.style.transition = 'linear 0.5s';
            cropDescRef.current.style.zIndex = '-20';
        }
    };

    //title 가져오기
    const titleId = useSelector(
        (state: any) => state.reduxFlag.myProfileSlice.title
    );

    useEffect(() => {
        //시작 날짜 기준
        const turn = props.turn - 181;
        const year = Math.floor((turn + 60) / 360);
        const month: number = ((Math.floor(turn / 30) + 2) % 12) + 1;
        if (month === 3) {
            setTimeDuration1(`${year}년차 봄 ~ ${year}년차 여름`);
            setTimeDuration2(`(0${year}.03.01 ~ 0${year}.08.30)`);
            //가을이다
            setNowSeason(`현재 계절 : ${year}년차 가을`);
            setSeasonEventList(
                props.eventList.filter((event) => event.eventType === 'FALL')
            );
        } else if (month === 9) {
            setTimeDuration1(`${year}년차 가을 ~ ${year}년차 겨울`);
            setTimeDuration2(`(0${year}.09.01 ~ 0${year + 1}.02.30)`);
            //봄이다
            setNowSeason(`현재 계절 : ${year + 1}년차 봄`);
            setSeasonEventList(
                props.eventList.filter((event) => event.eventType === 'SPRING')
            );
        }
    }, []);

    return (
        <>
            <div className="w-full h-full flex items-center">
                <div className="w-[50%] h-full flex flex-col items-center">
                    {/* 기간표시 */}
                    <div className="w-full h-[10%] text-[2vw] flex justify-center items-center">
                        <p>{timeDuration1}</p>
                    </div>
                    {/* 분기 정산 결과 */}
                    <div className="w-full h-[55%] text-[2vw] flex flex-col px-[3vw] py-[1vh] justify-between">
                        <div className="w-full">
                            <div className="w-full flex justify-between">
                                <div>수익</div>
                                <div>{props.halfIncome.toLocaleString()}</div>
                            </div>
                            <div className="w-full flex justify-between">
                                <div>지출</div>
                                <div>
                                    {(-1 * props.halfOutcome).toLocaleString()}
                                </div>
                            </div>
                            <div className="w-full text-left text-[1.5vw]">
                                {timeDuration2}
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full h-[0.2vh]">
                                <div className="color-bg-subbold w-full h-full"></div>
                            </div>
                            <div className="w-full flex justify-between">
                                <div>반기 순이익</div>
                                <div>
                                    {(
                                        props.halfIncome - props.halfOutcome
                                    ).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 구분선 (정산 - 칭호) */}
                    <div className="w-[90%] h-[0.3vh] color-bg-subbold"></div>
                    {/* 칭호 */}
                    <div className="w-full h-[35%] flex flex-col items-center">
                        <p className="w-[90%] h-[20%] text-left text-[2vw]">
                            현재 칭호
                        </p>
                        <div className="w-[90%] h-[80%] pb-[1vh] flex justify-between items-center">
                            <div className="w-[80%] h-full flex justify-start items-center">
                                <img
                                    className="w-[6vw] h-[6vw] m-[1vw] aspect-square object-cover"
                                    src={`/src/assets/images/title/title(1).png`}
                                ></img>
                                <div className="text-[1.5vw]">
                                    {props.titleList[titleId - 1].titleName}
                                </div>
                            </div>
                            <div
                                className="border-[0.5vw] w-[20%] h-[40%] text-[1.5vw] color-border-subbold text-center cursor-pointer"
                                style={{ padding: 'auto' }}
                                onClick={() => {
                                    props.setMode(2);
                                }}
                            >
                                변경
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[0.2vw] h-[90%] color-bg-subbold"></div>
                <div className="w-[50%] h-full flex flex-col justify-between">
                    <div className="w-full h-[10%] ml-[1vw] mt-[1vh]">
                        <div className="text-[2vw] text-left">{nowSeason}</div>
                    </div>
                    {/* 이벤트 요소 */}
                    <div className="relative w-[90%] h-[30%] ml-[1vw] my-[2vh]">
                        <p className="text-[1.5vw] text-left ml-[1vw]">
                            계절 이벤트
                        </p>
                        <div
                            className="overflow-x-auto"
                            style={{ scrollbarWidth: 'thin' }}
                        >
                            <div className="flex flex-shrink-0">
                                {seasonEventList.map((event) => {
                                    return (
                                        <img
                                            className="w-[5vw] h-[6vw] m-[1vw] rounded aspect-square object-cover flex-shrink-0"
                                            src={loadEventImg(event.eventName)}
                                            onMouseOver={() =>
                                                hoverEventImg(event)
                                            }
                                            onMouseLeave={endHoverEvent}
                                        ></img>
                                    );
                                })}
                                <div
                                    className="absolute w-full h-[10vw] top-[10vw] bg-black opacity-0 text-white -z-20"
                                    ref={eventDescRef}
                                >
                                    {eventDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 작물 요소 */}
                    <div className="relative w-[90%] h-[60%] ml-[1vw] mt-[1vh]">
                        <p className="text-[1.5vw] text-left ml-[1vw]">
                            구매 가능 작물
                        </p>
                        <div
                            className="overflow-x-auto"
                            style={{ scrollbarWidth: 'thin' }}
                        >
                            <div className="flex flex-shrink-0">
                                {props.inProductList.map((cropId) => {
                                    return (
                                        <img
                                            className="w-[6vw] h-[6vw] m-[1vw] aspect-square object-cover flex-shrink-0"
                                            src={`/src/assets/images/product/crop (${cropId}).png`}
                                            onMouseOver={() =>
                                                hoverCropImg(cropId)
                                            }
                                            onMouseLeave={endHoverCrop}
                                        ></img>
                                    );
                                })}
                                <div
                                    className="absolute w-full h-[5.5vw] top-[10vw] px-[1vw] bg-black opacity-0 text-white -z-20"
                                    ref={cropDescRef}
                                >
                                    <p className="w-full text-left text-[2vw]">
                                        {cropName}
                                    </p>
                                    <p className="w-full text-left text-[1.5vw]">{`제철 : ${cropSeason}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
