/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [self redirectLogToDocuments];
  [self printLogFile];
  
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  NSURL *jsCodeLocation;

  //jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"tutorRN"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  NSLog(@"openURL : %@", url.absoluteString);
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  // Add any custom logic here.
  
  return handled;
}


- (void)printLogFile
{
  NSArray *allPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [allPaths objectAtIndex:0];
  NSString *pathForLog = [documentsDirectory stringByAppendingPathComponent:@"logFile.txt"];
  
  if ([[NSFileManager defaultManager] fileExistsAtPath:pathForLog])
  {
    NSData *file1 = [[NSData alloc] initWithContentsOfFile:pathForLog];
    if (file1)
    {
      NSString *myString = [[NSString alloc] initWithData:file1 encoding:NSUTF8StringEncoding];
      NSLog(@"==== Log file data ====");
      NSLog(@"%@", myString);
      NSLog(@"==== END of LOG FILE ====");
      
    }
  }else
  {
    NSLog(@"no file found ");
  }
}

- (void)redirectLogToDocuments
{
  NSArray *allPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [allPaths objectAtIndex:0];
  NSString *pathForLog = [documentsDirectory stringByAppendingPathComponent:@"logFile.txt"];
  NSLog(@"pathForLog : %@", pathForLog);
  
  freopen([pathForLog cStringUsingEncoding:NSASCIIStringEncoding],"a+",stderr);
}


@end
