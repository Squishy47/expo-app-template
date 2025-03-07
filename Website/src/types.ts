export type Task = {
    id: string;
    name: string;
    start_time: string;
    end_time: string;
    person_id: string;
};

export type Person = {
    id: string;
    name: string;
};

export type Event = {
    id: string;
    name: string;
    date: string;
};

export type CreateEvent = {
    name: string;
    start_time: string;
    end_time: string;
    user_id: string;
};
