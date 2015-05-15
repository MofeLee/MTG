﻿module appState{
    export var users: string = "users";
    export var usersUrl: string = "/adm/users";
    export var user: string = "user";
}

module app.adm.users {
    "use strict";

    export interface IUserRouteParams{
        userId: string;
    }

    export interface IUserStateParams extends ng.ui.IStateParamsService, IUserRouteParams {
    }

    export class UserRouteParams implements IUserRouteParams{
        constructor(public userId: string) { }
    }

    route.$inject = [
        "$stateProvider"
    ];
    function route($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state(appState.users, {
            url: appState.usersUrl,
                views: {
                    'header': {
                        templateUrl: app.header.headerMainTemplate_StringName, 
                        controller: app.header.headerMainController_StringName,
                        controllerAs: "vm"
                    },
                    'container': {
                        templateUrl: app.users.usersTemplate_StringName,
                        controller: app.users.usersController_StringName,
                        controllerAs: "vm"
                    },
                    'footer': {}
                }
            })
            .state(appState.user, {
            url: appState.usersUrl + "/{userId}",
            views: {
                'header': {
                    templateUrl: app.header.headerBackDeleteSaveTemplate_StringName,
                    controller: app.header.HeaderBackDeleteSaveController,
                    controllerAs: "vm"
                },
                'container': {
                    templateUrl: app.users.userTemplate_StringName,
                    controller: app.users.userController_StringName,
                    controllerAs: "vm"
                },
                'footer': {}
            }
            });
    };
    angular
        .module("app")
        .config(route);
}
