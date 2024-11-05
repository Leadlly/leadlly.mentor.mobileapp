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
export interface ISubject {
  name: string;
  overall_efficiency: number;
  overall_progress: number;
  total_questions_solved: { number: number; percentage: number };
}
export interface IAcademic {
  standard: number;
  competitiveExam?: string | null;
  subjects?: ISubject[];
  schedule?: string | null;
  coachingMode?: string | null;
  coachingName?: string | null;
  coachingAddress?: string | null;
  schoolOrCollegeName?: string | null;
  schoolOrCollegeAddress?: string | null;
}

export type StudentDataProps = {
  token: string;
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  category: "basic" | "pro" | "premium" | "free" | null;
  phone: {
    personal?: number;
    other?: number;
  };
  password: string;
  salt: string;
  avatar?: {
    public_id?: string;
    url?: string;
  };
  planner: boolean;
  parent: {
    name?: string;
    phone?: string;
  };
  mentor: {
    id?: string;
  };
  address: {
    country?: string;
    addressLine?: string;
    pincode?: number;
  };
  academic: IAcademic;
  about: {
    dateOfBirth?: string;
    gender: string;
  };
  role?: string;
  details: {
    level: { number: number };
    points?: { number: number };
    streak?: { number: number; updatedAt: Date };
    mood: Array<{
      day: string;
      date: string;
      emoji: string | null;
    }>;
    report: {
      dailyReport: {
        date: Date;
        session: number;
        quiz: number;
        overall: number;
      };
    };
  };
  badges?: Array<{
    name: string;
    url: string;
  }>;
  points?: number;
  subscription: {
    id?: string;
    status?: string;
    planId?: string;
    duration: number;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
    coupon?: string;

    upgradation?: {
      previousPlanId?: string;
      previousDuration?: number;
      dateOfUpgradation?: Date;
      addedDuration?: number;
    };
  };
  freeTrial: {
    availed?: boolean;
    active?: boolean;
    dateOfActivation?: Date;
    dateOfDeactivation?: Date;
  };
  refund: {
    type?: string;
    subscriptionType?: string;
    status?: string;
    amount?: string;
  };
  disabled: boolean;
  resetPasswordToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface EfficiencyOption {
  min?: number;
  max?: number;
  label: string;
  labelClassName: string;
  cardBackgroundColor: string;
  textColor: string;
}

export type DataProps = {
  data: PlannerDataProps;
};
export type PlannerDataProps = {
  student: string;
  startDate: string;
  endDate: string;
  days: TDayProps[];
  createdAt: string;
};
export type TRevisionProps = {
  _id: string;
  user: string;
  tag: string;
  topic: Topic;
  chapter: Chapter;
  subject: ISubject;
  standard: number;
  createdAt?: Date;
  updatedAt?: Date;
  efficiency?: any;
  quizScores?: number[];
  weeklyTestScore?: number;
};
