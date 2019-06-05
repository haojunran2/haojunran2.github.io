Git 2005 Linux操作系统的作者开发的 只耗时一周！

版本管理工具
CVS/SVN/VSS

上面三种都是集中式：必须要依赖于一台代码服务器，必须要通过网络实现提交！

Git特点：分布式、高性能

它不要求一定要通过代码服务器进行管理，你的U盘，电脑都可以作为代码仓库（就是个目录）！

---------------------------------------------------------------------------------------

Git仓库的工作原理：

分三阶段提交：
1、工作区（在工作区编辑的文件和仓库没有任何关系）

2、暂存区（将工作区文件放入暂存记录、索引、镜像（这类准备工作），便于之后的正式提交和仓库管理）

3、仓库区（文件内容正式写入代码库中）

------------------------------------------------------------------------------------

查看版本
git --version

查看主要命令
git --help

查看所有命令
git help -a

查看具体某个命令
git help clone
git clone --help

初始化一个目录为仓库
cd Git
git init

会自动在路径下生成一个.git隐藏目录（它就是当前仓库的核心目录）
通过'dir /ah'查看

在当前仓库注册使用者的信息（姓名和邮箱）
只要在当前仓库下的提交，都会自动附加个人信息（便于团队之间的联系）
git config user.name "itany"
git config user.email "itany@123.com"

查看当前仓库的使用者信息
git config user.name
git config user.email

注意，这个信息只针对当前仓库有效，如果你在本机多个位置都有仓库，那么也可以设置全局的使用者信息！
如果你同时设置了本仓库的使用者信息和全局的使用者信息，那么当前仓库优先使用本仓库中的使用者信息！
如果某个仓库没有注册自己本仓库的使用者信息，那么就使用全局的！

git config --global user.name "lisi"
git config --global user.email "itany@123.com"

查看全局的使用者注册信息
git config --global user.name
git config --global user.email

查看所有配置相关的信息
git config -l

------------------------------------------------------------------------------------------

注意：
1、所有与仓库有关的操作，都必须在仓库所在目录下运行！！！
2、Git只识别和管理文本内容的文件，但是诸如exe执行文件、图片、影像等等二进制文件，Git不做改动追溯！

查看当前工作区的状态（哪些文件尚未暂存（以红色显示），哪些文件已经暂存（以绿色显示））
git status

定义并使用.gitignore文件，在此其中每行记录不希望被git管理的文件列表（以后通过git status就不会提醒这些文件尚未暂存）！

将工作区文件或者目录加入暂存区
git add hello.js *.htm *.css
git add src/

移除暂存的文件
git rm --cached index.htm
移除暂存的目录
git rm --cached -r src/

将工作区下所有尚未暂存的内容全部加入暂存区（包括文件、目录、子目录）
git add -A
git add --all
git add .

提交暂存区内容到仓库区
git commit -m "init project"

检出/恢复仓库中的内容到工作区（还原工作区）
git checkout -- hello.js

记住：每次工作区的改修都要重新加入暂存再去提交！

重命名文件（rename hello.js to index.js）
git add hello.js index.js       -- 将这新旧两个文件名重新加入暂存区，git会自动识别出，这是重命名！
git commit -m "rename hello.js to index.js"

删除文件（del style.css）
git add style.css               -- 将删除的文件重新加入暂存区，git会自动识别出，这是删除！
git commit -m "del style.css"

查看所有操作历史
git log

查看最近的3次操作
git log -3

过滤日志（指定提交者）
git log --author zhangsan

仅显示精简日志
git log --pretty=oneline

查看版本差异
1、比较暂存区和工作区的差异
git diff index.js
暂存区： 红色部分
工作区： 绿色部分

2、比较暂存区和仓库区的差异
git diff --cached index.js
仓库区： 红色部分
暂存区： 绿色部分

3、比较工作区和仓库区的差异
git diff HEAD index.js
仓库区： 红色部分
工作区： 绿色部分

记住：两两阶段的比较，绿色显示的是最近阶段的改动，红色是最远阶段的改动！

工作区还原到仓库区的某一个提交点（追溯/恢复）
1、恢复到最新
git reset --hard
2、追溯到之前某一个提交点
首先通过git log查看你要追溯到的那个点的提交ID，再通过提交ID追溯
git reset --hard 02b073

注意：你一旦做了工作区追溯，你的提交信息只会保留你所追溯到的那个提交点之前的日志！

这时，可以通过git reflog查看仓库托管期间所有的操作日志！
这个命令可以查看你追溯之前的所有操作历史！
git reflog

--------------------------------------------------------------------------------------------------

分支：当前你操作时所位于的节点！

所有仓库，在创建初始化完毕后，都是在master主分支上进行操作（我们不建议直接操作主分支）！

分支操作原则：主分支不直接修改，如何要修改，新辟分支，在新分支上修改，改完了再合并到主分支（所以主分支只做合并和发布用）！

所谓创建分支，就是在当前分支上复制一个镜像！

场景：
现在团队有两个工作需要完成，一个是在当前应用基础上进行新模块的研发，一个是在当前应用基础上进行bugs的修复！

这时，项目经理就需要在当前应用的主分支master上开辟两个子分支，一个叫new_feature，一个叫fix_bugs！
如果new_feature完成了自己的新模块研发工作，经测试无误，那么项目经理最终将新的模块代码new_feature和主分支master合并！
如果fix_bugs完成了自己的bugs修复工作，经测试无误，那么项目经理最终将修改后的代码fix_bugs和主分支master合并！

这样开辟新分支去实现不同工作，既可以保证两个不同团队之间的隔离，互不干扰，同时又确保基础代码的一致性，便于之后的整合！

创建分支
git branch new_feature

查看当前所在分支
git branch

注意：一定要确保当前要操作的分支是子分支（绿色显示，前面有*）

切换分支
git checkout new_feature

重命名分支
git branch -m new_feature scan_qrcode_feature

假如子分支开发完毕已经合并到主分支上，那么可以删除子分支了
git branch -d scan_qrcode_feature

但是，有两种情况不能删除子分支：
1、当前你正在操作/检出该子分支
2、要删除的子分支尚未和主分支合并

强制删除未合并的子分支
git branch -D scan_qrcode_feature

创建新分支的同时切换到新分支（不然你要先branch再checkout）
git checkout -b scan_qrcode_feature

------------------------------------------------------------------------------

分支合并中“冲突”的解决

多个用户提交代码，多个分支合并代码，都会产生冲突！

第一个提交的不会有冲突，第二个提交的会与第一个提交的相同代码行，报冲突！

合并过程（将分支fix_bugs合并到master）
1、先检出master
git checkout master
2、合并fix_bugs
git merge fix_bugs

如果merge过程中，发生了冲突，报错CONFLICT (content): Merge conflict in index.js
这时编辑报冲突的文件index.js，将<<<<<<<========>>>>>>>>之间的代码，改为你希望保留的内容
再次加入暂存区，再次提交即可！

-------------------------------------------------------------------------------------------------------

远程仓库的使用
github
gitee

我们需要将远程仓库的地址在本地仓库关联，然后将本地仓库的分支上传到远程仓库！

在本地仓库可以关联任意多的远程仓库地址！
git remote add wbs19032 https://github.com/yufeng2/wbs19032.git
git remote add myhomepage https://github.com/yufeng2/myhomepage.git

查看本地仓库关联的远程地址
git remote -v
git remote --verbose

删除本地仓库关联的远程地址
git remote rm myhomepage

修改远程仓库地址在本地仓管的关联名称
git remote rename wbs19032 itany19032

上传本地分支（push是一个合并的过程，既然是合并就会有冲突）
git push itany19032 new_feature
git push itany19032 master:main         -- 上传本地分支master到远程的main分支（如果远程没有main相当于重命名，如果远程有main就是合并）

所有需要同步到远程的内容，都必须要先加入本地仓库，然后再push同步到远程！

下载远程分支到本地（pull是一个合并的过程，既然是合并就会有冲突）
git pull itany19032 fix_bugs            -- 将远程分支fix_bugs合并到当前本地分支
如果你是要下载到本地（通过:fix_bugs重命名到本地）
git pull itany19032 fix_bugs:fix_bugs

如果push产生冲突，那么必须要先pull到本地，然后在本地解决冲突，然后再次提交本本地，最后再次push！











