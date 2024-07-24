//
export interface LanguageData {
  language: {
    name: string;
  };
  flavor_text?: string;
  genus?: string;
  name: string; // 다른 필요한 속성들 추가 가능
}
// 검색
export interface InputProps {
  search: {
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
  refetch: () => void;
}
export interface pokeType {
  [key: string]: {
    name: string;
    color: string;
  };
}
