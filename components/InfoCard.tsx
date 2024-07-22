import { InfoCardProps } from "@/types";
import Image from "next/image";

const InfoCard: React.FC<InfoCardProps> = ({
  iconSrc,
  bgColor,
  title,
  description,
}) => (
  <div className="flex flex-col text-center min-w-[18rem] h-full bg-background rounded-sm cursor-pointer transition-all duration-300 hover:bg-gradient-to-t from-primary-foreground to-background overflow-hidden hover:-translate-y-2 border border-gray-100 p-4 gap-3 items-center">
    <div
      className={`p-3 aspect-square rounded-full ${bgColor} text-background`}
    >
      <Image src={iconSrc} width={32} height={32} alt={`${title} icon`} />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-accent-foreground">{description}</p>
    </div>
  </div>
);

export default InfoCard;
