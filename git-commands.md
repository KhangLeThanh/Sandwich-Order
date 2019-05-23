# Git commands for working with branches

## Creating a new branch

Before creating a new branch, move to the branch you wish to base the created branch on. In this example I will be using master as the base branch.
```
git checkout master
```
Then you can create a new branch using the command:
```
git branch <name_of_branch>
```
Git will not automatically switch to the branch so you have to checkout it:
```
git checkout <name_of_branch>
```

There is a shorthand for the commands above, which creates a branch from master and checkouts it:
```
git checkout -b <name_of_branch> master
```
## Working in the branch

Pushing/pulling work almost the same. The only difference is that when pushing you need to specify the branch you are pushing to.

Commit some work:
```
git add -A
git commit -m "Some work"
```

Then comes the push step:
```
git push origin <name_of_branch>
```

If you try to push without defining the branch an error will pop up:
```
fatal: The current branch <your_branch_name> has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin <your_branch_name>
```

If you use the --set-upstream flag, you wont need to specify the branch name in subsequent pushes.

## Merging

Hopefully all merging will be done using GitLabs pull request system, which is capable of merging branches to the master branch. However there might be a situation where you need work from the master branch integrated to your branch to continue working. In this case you can merge the master (or some other branch) to your branch.

To merge a branch, first move to the branch you want the changes in. In this case we want to merge master to <your_branch_name>:
```
git checkout <your_branch_name>
```

Then start the merge process and specify which branch you want to merge:
```
git merge master
```

## Merge conflicts

Some times when merging, work has been done to the same file and git does not know how to automatically merge them. It will then produce a message containing the files that are conflicting. I suggest a GUI based approach to resolving merge conflicts such as TortoiseGit.

The conflicting file will have markers like these:
```
<<<<<<< <branch_name> #start of the conflict
<content_from_branch_name>
=======
<content_from_branch_that_is_being_merged>
```

Before continuing you will need to resolve all the conflicts marked like this by keeping either one of the content blocks or a combined version. To signify that the confilct is resolved, all the special markers need to be removed from the file.

After resolving add the files and commit:
```
git add <conflicting_files>
git commit -m "Resolved merge conflict"
git push
```

More info on branches & merging:
https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging

More info on merging:
https://fi.atlassian.com/git/tutorials/using-branches/git-merge
