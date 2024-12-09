import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const URL_BASE =
  "https://xqoltwofgjyfdjsfdjib.supabase.co/storage/v1/object/public/UPN";

export default function ProfileImage({
  dni,
  names,
  lastNames,
  classNameAvatar,
}: {
  dni: string;
  names: string;
  lastNames: string;
  classNameAvatar?: string;
}) {
  const abv = names.charAt(0).toUpperCase() + lastNames.charAt(0).toUpperCase();
  const url = `${URL_BASE}/${dni}.jpeg`;

  return (
    <Avatar className={classNameAvatar}>
      <AvatarImage src={url} alt={abv} />
      <AvatarFallback>{abv}</AvatarFallback>
    </Avatar>
  );
}
