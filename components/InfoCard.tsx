import { InfoCardProps } from "@/types";
import Image from "next/image";

const InfoCard: React.FC<InfoCardProps> = ({
  iconSrc,
  bgColor,
  title,
  description,
}) => (
  <div className="flex flex-col text-center w-full h-full bg-background rounded-sm hover-animate border border-gray-100 p-4 gap-3 items-center">
    {iconSrc && (
      <div
        className={`p-3 aspect-square rounded-full ${bgColor} text-background`}
      >
        <Image src={iconSrc} width={32} height={32} alt={`${title} icon`} />
      </div>
    )}
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default InfoCard;
