<?php

use App\Models\Assignment;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->date('release_date');
            $table->date('due_date');
            $table->string('description');
            $table->foreignId('course_semester_id');
            $table->enum('type', Assignment::$TYPES)->default('homework');
            $table->string('link')->nullable();
            $table->boolean('verified')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_semester_id')->references('id')->on('course_semesters');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments');
    }
}
