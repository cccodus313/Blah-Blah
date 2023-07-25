import Head from 'next/head';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const ServiceLayout = function ({ title = 'blah-blah', children }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};
