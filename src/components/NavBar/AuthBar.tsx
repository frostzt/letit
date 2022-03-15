import { useApolloClient } from '@apollo/client';
import { CogIcon, LogoutIcon, UserIcon } from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { classNames } from '../../utils/classNames';
const UserProfile = dynamic(() => import('./UserProfile'));
const DropDown = dynamic(() => import('../../ui/DropDown'), { ssr: false });

const AuthBar: React.FC = () => {
  const apolloClient = useApolloClient();
  const { data: user, loading } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  return (
    <div>
      {loading && null}
      {!loading && !user?.me ? (
        <div className="flex items-center">
          <div className="cursor-pointer mr-5">
            <NextLink href="/login">
              <div className="text-sm text-indigo-500">Login</div>
            </NextLink>
          </div>
          <div className="cursor-pointer bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-full py-1 px-3">
            <NextLink href="/register">
              <div className="text-sm text-white">Register</div>
            </NextLink>
          </div>
        </div>
      ) : null}
      {!loading && user?.me ? (
        <div className="flex items-center">
          <UserProfile user={user} className="mr-3" />
          <DropDown>
            <div className="py-1">
              <Menu.Item>
                {() => (
                  <div className="px-4 py-2 text-sm cursor-pointer">
                    <p>Signed in as</p>
                    <h3 className="font-bold">{user.me?.username}</h3>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    <NextLink href="/me">
                      <div className="flex items-center">
                        <div className="inline-block w-4 h-4 mr-3">
                          <UserIcon />
                        </div>{' '}
                        Profile
                      </div>
                    </NextLink>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'px-4 py-2 text-sm cursor-pointer'
                    )}
                  >
                    <NextLink href="/me">
                      <div className="flex items-center">
                        <div className="inline-block w-4 h-4 mr-3">
                          <CogIcon />
                        </div>{' '}
                        Settings
                      </div>
                    </NextLink>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={async () => {
                      await logout();
                      await apolloClient.resetStore();
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'px-4 py-2 text-sm cursor-pointer flex items-center'
                    )}
                  >
                    <div className="inline-block w-4 h-4 mr-3">
                      <LogoutIcon />
                    </div>{' '}
                    Signout
                  </div>
                )}
              </Menu.Item>
            </div>
          </DropDown>
        </div>
      ) : null}
    </div>
  );
};

export default AuthBar;
