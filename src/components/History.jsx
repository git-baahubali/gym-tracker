// import { Carousel } from "./ui/carousel";

function History() {
    console.log("History");
     return (
        <div>
            <CarouselSize />
        </div>
    )
}

export default History


import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom";

export function CarouselSize() {

    const getPastFiveDays = (nofDays) => {
        const dates = [];
        for (let i = 0; i < nofDays; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]); // Store as 'YYYY-MM-DD'
        }
        return dates;
    };

    const pastFiveDays = getPastFiveDays(5);
    
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent className="flex-row-reverse">
                {Array.from({ length: 5 }).map((_, index) => {

                    return  <Link key={index} to={'/day/'+ pastFiveDays[index]}>
                    <CarouselItem  className="basis-1/3 md:basis-1/2 lg:basis-1/3 ">
                        <div className="p-1" >
                            <Card>
                                <CardContent className={"flex aspect-square items-center justify-center p-6 "+ `bg-red-${100*index}`}>
                                    <span className="text-xl font-semibold">{ pastFiveDays[index] }</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem></Link>
})}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}