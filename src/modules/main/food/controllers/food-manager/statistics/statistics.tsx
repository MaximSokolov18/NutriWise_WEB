import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selector} from "src/modules/services/slice";
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import {BarChart} from "@mui/x-charts";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {EatenFood} from "../my-foods/hooks/useMyFoods";
import './statistics.styl';

type Dataset = {
    calories: number,
    date: string
}

const getCaloriesByTimeRange = (foods: EatenFood[], timeRange = 'day'): Array<Dataset> => {
    const caloriesMap = new Map<string, number>();

    foods.forEach(food => {
        const date = new Date(food.date);

        let timeUnit;
        switch (timeRange) {
            case 'day':
                timeUnit = date.toLocaleDateString(); // Day of month
                break;
            case 'week':
                timeUnit = date.getDay(); // Day of week (0 for Sunday, 1 for Monday, etc.)
                break;
            case 'month':
                timeUnit = date.getDate(); // Day of month
                break;
            case 'year':
                timeUnit = date.getMonth(); // Month (0 for January, 1 for February, etc.)
                break;
            default:
                throw new Error('Invalid time range');
        }

        const totalCalories = caloriesMap.get(String(timeUnit)) || 0;
        const newTotalCalories = totalCalories + food.calories;
        caloriesMap.set(String(timeUnit), newTotalCalories);
    });

    const result = [];
    // @ts-ignore
    for (const [timeUnit, calories] of caloriesMap.entries()) {
        result.push({ calories, date: timeUnit });
    }

    return result.reverse();
}

const valueFormatter = (value: number | null) => `${value}kcal`;
const chartSetting = {
    yAxis: [
        {
            label: 'Calories (kcal)',
        },
    ],
    series: [{dataKey: 'calories', valueFormatter}],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        }
    },
}

export const Statistics = () => {
    const [dataset, setDataset] = useState<Array<Dataset>>([]);
    const user = useSelector(selector);
    const isRunUseEffect = useRef(false);

    useEffect(() => {
        if (isRunUseEffect.current && user.eatenFoods) {
            setDataset(getCaloriesByTimeRange(user.eatenFoods));
        }

        return () => {
            isRunUseEffect.current = true;
        }
    }, [user.eatenFoods]);

    return (
        <div className="statistics">
            <div className="statistics__header">
                <h3 className="statistics__title">Statistics</h3>
            </div>
            <div className="statistics__content">
                {false ? (<Box width="100%" display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box>) : (
                    <BarChart
                        dataset={dataset}
                        xAxis={[{scaleType: 'band', dataKey: 'date', tickPlacement: 'middle', tickLabelPlacement: 'middle'}]}
                        {...chartSetting}
                    />

                )}
            </div>
        </div>
    );
}