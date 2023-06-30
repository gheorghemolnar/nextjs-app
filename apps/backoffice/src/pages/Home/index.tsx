import { BellIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardContent, CardHeader, CardTitle } from '@big/ui';

import {
    mesCommunications,
    mesControles,
    mesDocuments
} from '@backoffice/components/menu';

function getCounter() {
    return Math.trunc(Math.random() * 100);
}

export default function Home() {
    return (
        <div className="mx-10 grid gap-10 full py-6">
            {[...mesControles, ...mesDocuments, ...mesCommunications].map(
                (controle, sectionIndex) => {
                    return (
                        <section
                            key={`section-${sectionIndex}`}
                            className="font-normal"
                        >
                            <h1 className="text-lg font-bold">
                                {controle.name}
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {controle?.items
                                    ? controle.items.map((child, index) => {
                                          const counterNC = getCounter();
                                          const counterNV = getCounter();
                                          const details =
                                              sectionIndex === 0 ? (
                                                  <>
                                                      <span className="text-brand font-bold">
                                                          {counterNC} Non
                                                          Conforme(s)
                                                      </span>{' '}
                                                      / {counterNC * 10}
                                                  </>
                                              ) : (
                                                  <>
                                                      <span className="text-brand font-semibold">
                                                          {counterNV} Non Vu(s)
                                                      </span>{' '}
                                                      / {counterNV * 10}
                                                  </>
                                              );

                                          return (
                                              <Link
                                                  to={`${child.link}?&resultatCtrl=NC`}
                                                  key={`controle-${index}`}
                                              >
                                                  <Card className="w-[350px]">
                                                      <CardHeader>
                                                          <CardTitle className="flex justify-between">
                                                              <p>
                                                                  {child.name}
                                                              </p>
                                                              <div className="flex gap-1">
                                                                  <BellIcon />
                                                                  <Badge variant="destructive">
                                                                      {
                                                                          counterNC
                                                                      }
                                                                  </Badge>
                                                              </div>
                                                          </CardTitle>
                                                      </CardHeader>
                                                      <CardContent className="grid gap-4">
                                                          <div className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0">
                                                              <div className="space-y-1">
                                                                  <p className="text-sm text-muted-foreground">
                                                                      {details}
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </CardContent>
                                                  </Card>
                                              </Link>
                                          );
                                      })
                                    : null}
                            </div>
                        </section>
                    );
                }
            )}
        </div>
    );
}
