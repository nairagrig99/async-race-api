import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect, useRef} from "react";
import {resetEngineState, startCar, startRaceMode, stopCar, stopRace} from "../../store/EngineState.ts";
import {ButtonType} from "../../enums/button-type.ts";
import {CAR_BRANDS, CAR_MODELS, PAGE_END, RGB_COLOR} from "../../constants/constant.ts";
import {createCar} from "../../services/GarageService.ts";
import {ErrorMessage} from "../../enums/error-message.ts";
import {ServerURL} from "../../enums/request-url.ts";
import Button from "../../UI/Button.tsx";
import {ButtonStyleEnum} from "../../enums/button-style.ts";
import {openCarModal} from "../../store/ModalSlice.ts";
import type {RacingState} from "../../interface/racing-state.ts";

export default function CarModal({carListRace}: RacingState) {
    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.carRaceStartSlice);
    const engineState = useSelector((state: RootState) => state.engineStateSlice);

    const timeOutRef = useRef<Set<number>>(new Set());

    useEffect(() => {
    }, [engineState]);

    useEffect(() => {
        return () => {
            dispatch(resetEngineState());
        }
    }, []);

    useEffect(() => {
        const carElement = carListRace.find(element =>
            element && element.dataset.id === selector.id.toString()
        );

        if (carElement && carElement.dataset.id) {
            if (selector.mode === ButtonType.START) {
                const elementIndex = +carElement.dataset.id;
                startRace(carElement, elementIndex);
                dispatch(stopCar(false))
                dispatch(stopRace(false))
            } else {
                removeAllTimeouts();
                stopRacing(carElement);
            }
        }
    }, [selector.id, selector.mode]);

    const getRandomColor = () => "#" + Math.floor(Math.random() * RGB_COLOR).toString(16).padStart(6, "0")

    const createRandomCars = () => {
        const carList = [];

        for (let i = 0; i < PAGE_END; i++) {
            const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
            const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

            carList.push({
                name: `${brand} ${model}`,
                color: getRandomColor()
            });
        }

        carList.forEach(car => {
            dispatch(createCar({form: car}));
        });
    }
    const racingMode = (mode: string) => {
        if (mode === ButtonType.RACE) {
            carListRace.forEach((el: HTMLElement) => {
                    const id = Number(el.dataset.id);
                    dispatch(startCar(true))
                    dispatch(stopRace(true))
                    dispatch(stopCar(false))
                    dispatch(startRaceMode(true))
                    startRace(el, id)
                }
            );
        } else {
            removeAllTimeouts()
            carListRace.forEach((el: HTMLElement) => {
                stopRacing(el);
            });
            dispatch(stopRace(true))
            dispatch(startCar(false))
            dispatch(stopCar(true))
            dispatch(startRaceMode(false))
        }
    }

    const removeAllTimeouts = () => {
        timeOutRef.current.forEach((timeout) => {
            clearTimeout(timeout);
        })
        timeOutRef.current.clear()
    }

    const startRace = (el: HTMLElement, id: number) => {

        fetch(`${ServerURL.URL}/engine?id=${id}&status=started`, {method: "PATCH"})
            .then(async (res) => {
                if (!res.ok) throw new Error(ErrorMessage.FAILED_ENGINE);
                return res.json();
            })
            .then((startedData) => {
                const velocityTime = Math.round(startedData.distance / startedData.velocity);
                const durationSeconds = velocityTime / 1000;
                return {durationSeconds}
            }).then(({durationSeconds}) => {
            fetch(`${ServerURL.URL}/engine?id=${id}&status=drive`, {method: "PATCH"})
                .then((driveRes) => {
                    if (!driveRes.ok && driveRes.status === 500) {

                        stopRacingOnTheWay(el);
                    }
                });

            return {durationSeconds}
        }).then(({durationSeconds}) => {
            const carElement = el.querySelector(".race-car") as HTMLElement;
            carElement.style.position = "absolute";
            carElement.style.animation = `moveRight ${durationSeconds}s linear forwards`;
            const handleAnimationEnd = () => {
                carElement.removeEventListener("animationend", handleAnimationEnd);
            };
            carElement.addEventListener("animationend", handleAnimationEnd);
        })
    };

    const stopRacingOnTheWay = (el: HTMLElement) => {
        if (el) {
            (el.querySelector(".race-car") as HTMLElement).style.animationPlayState = 'paused';
        }
    }


    const stopRacing = (el: HTMLElement) => {
        if (el) {
            const carElement = el.querySelector(".race-car") as HTMLElement;
            if (carElement) {
                carElement.style.position = "relative";
                carElement.style.animation = `none`;
            }
        }
    }

    return <div className="border-b border-solid pb-[30px] flex-wrap gap-2.5 flex justify-between">
        <div className="flex gap-2.5">
            <Button
                className={ButtonStyleEnum.CREATE_BUTTON + ' ' + (engineState.start_race ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                disabled={engineState.start_race}
                onClick={() => racingMode(ButtonType.RACE)}
                value={ButtonType.RACE}/>

            <Button
                className={ButtonStyleEnum.CANCEL_BUTTON + ' ' + (engineState.stop_race ? ButtonStyleEnum.BUTTON_DISABLED : '')}
                onClick={() => racingMode(ButtonType.RESET)}
                disabled={engineState.stop_race}
                value={ButtonType.RESET}/>

        </div>

        <Button className={ButtonStyleEnum.CREATE_BUTTON}
                onClick={() => dispatch(openCarModal({mode: ButtonType.CREATE, car: undefined}))}
                value={ButtonType.CREATE}/>


        <Button className={ButtonStyleEnum.GENERATE_BUTTON}
                onClick={() => createRandomCars()}
                value={ButtonType.GENERATE_CARS}/>

    </div>
}