import Nav from './nav';

type LayoutProps = {
    children: React.ReactNode,
};
export default function Layout({ children }: LayoutProps) {
    return (
        <div className='flex flex-col w-full h-screen'>
            <Nav />
            <main className='w-full h-screen'>
                {children}
            </main>
        </div>
    );
}