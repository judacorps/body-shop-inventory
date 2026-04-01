export type RootStackParamList = {
  Home: undefined;
  CaptureUnit: undefined;
  CaptureOdometer: { unitPhotoUri: string; unitIdSeed?: string };
  Review: {
    unitPhotoUri: string;
    odometerPhotoUri: string;
    unitDetected: string;
    mileageDetected: string;
    unitConfidence: number;
    mileageConfidence: number;
  };
};
