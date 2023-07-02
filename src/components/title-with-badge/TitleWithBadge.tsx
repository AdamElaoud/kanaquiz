import Badge from "@/components/badge/Badge";

interface Props {
    title: string;
    count: number;
};

const TitleWithBadge = (props: Props): JSX.Element => {
    const { title, count } = props;

    if (count > 0)
        return (
            <>
                <Badge value={count} />
                {title}
            </>
        );

    return <>{title}</>;
};

export default TitleWithBadge;
