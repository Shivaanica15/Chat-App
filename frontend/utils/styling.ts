import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] = 
    SCREEN_WIDTH < SCREEN_HEIGHT
        ? [SCREEN_WIDTH, SCREEN_HEIGHT]
        : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidlineBaseWidth = 375;
const guidlineBaseHeigh = 812;

export const scale = (size: number) =>
    Math.round(
        PixelRatio.roundToNearestPixel(
            (shortDimension / guidlineBaseWidth) * (size as number)
        )
    );


export const verticalScale = (size: number) =>
    Math.round(
        PixelRatio.roundToNearestPixel(
            (longDimension / guidlineBaseHeigh) * (size as number)
        )
    );




