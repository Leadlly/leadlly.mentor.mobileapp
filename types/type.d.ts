import { ImageSourcePropType, TextInputProps } from "react-native";
export interface IAvatar {
  public_id: string;
  url: string;
}

export interface IAbout {
  dateOfBirth: string | null;
  gender: string | null;
}

export interface IAddress {
  country: string | null;
  addressLine: string | null;
  pincode: number | null;
}

export interface IPhone {
  personal: number | null;
  other: number | null;
}

export interface IStudent {
  id: string;
  gmeet: IGMeet;
}

export interface MentorPersonalInfoProps {
  _id: string;
  token: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  phone: IPhone;
  password?: string | null;
  salt?: string | null;
  address: IAddress;
  avatar: IAvatar;
  about: IAbout;
  academic: {
    schoolOrCollegeName: string | null;
    schoolOrCollegeAddress: string | null;
    degree: string | null;
  };
  status: "Verified" | "Not Verified";
  gmeet: IGMeet;
  preference: {
    standard: string[];
    competitiveExam: string[];
  };
  students: IStudent[];
  createdAt: Date;
  resetPasswordToken?: string | null;
  resetTokenExpiry?: Date | null;

  comparePassword(candidatePassword: string): Promise<boolean>;
  getToken(): Promise<string>;
}
export type TDayProps = {
  date: string;
  day: string;
  continuousRevisionTopics: TRevisionProps[];
  backRevisionTopics: TRevisionProps[];
  questions: { [key: string]: any };
  completedTopics: any[];
  incompletedTopics: any[];
  _id: string;
};

export interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  icon2?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  icon2Style?: string;
  className?: string;
  handlePress?: () => void;
}
export type FormType = UseFormReturn<
  {
    phoneNumber: string;
    schedule: string;
    gender?: "male" | "female" | "other" | undefined;
    class?: "11" | "12" | undefined;
    course?: "JEE" | "NEET" | undefined;
  },
  any,
  undefined
>;