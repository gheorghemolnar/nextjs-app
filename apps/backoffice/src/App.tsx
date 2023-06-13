import type { AccordionProps } from '@big/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Bonjour,
    CustomAccordion,
} from '@big/ui';

function App() {
    const content: AccordionProps = {
        data: [
            {
                trigger : 'Title 1',
                content : 'Content 1',
            },
            {
                trigger : 'Title 2',
                content : (
                    <div>
                        <p className="underline">Underline</p>
                        Je suis un component
                    </div>
                ),
            },
        ],
    };

    return (
        <div>
            <p className="text-green-500 text-xl text-center">BONJOUR</p>
            <Bonjour />
            <div className="flex justify-center">
                <div className="w-80 xl:max-w-lg">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Is it accessible?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It comes with default styles that matches
                                the other components' aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It's animated by default, but you can
                                disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <br />
            <br />
            <div className="flex justify-center">
                <div className="w-80 xl:max-w-lg">
                    <CustomAccordion data={content.data} />
                </div>
            </div>
        </div>
    );
}

export default App;
