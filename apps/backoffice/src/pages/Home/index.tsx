import { Example1, Overview } from '@backoffice/tmp/overview';

export default function Home() {
    return (
        <>
            <div className="flex flex-row">
                <Overview />
                <Example1 />
            </div>
        </>
    );
}
