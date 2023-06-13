import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@ui/lib/utils';

// eslint-disable-next-line unicorn/prevent-abbreviations
export type AccordionProps = {
    data: {
        trigger: string;
        content: string | React.ReactNode;
    }[];
};

//TODO: rename and only export that.
const CustomAccordion: React.FC<AccordionProps> = (properties) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {properties.data.map((item, index) => (
                <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{item.trigger}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...properties }, reference) => (
    <AccordionPrimitive.Item
        ref={reference}
        className={cn('border-b', className)}
        {...properties}
    />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...properties }, reference) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={reference}
            className={cn(
                'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
                className,
            )}
            {...properties}
        >
            {children}
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...properties }, reference) => (
    <AccordionPrimitive.Content
        ref={reference}
        className={cn(
            'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            className,
        )}
        {...properties}
    >
        <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    CustomAccordion,
};
